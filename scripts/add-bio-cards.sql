-- ============================================
-- Add Bio Cards to Pages Missing Them
-- Run this SQL in your Supabase SQL Editor
-- ============================================

-- Step 1: Find pages without bio_card
-- ============================================
SELECT 
    p.id,
    p.slug,
    p.title,
    COUNT(pc.id) as existing_components
FROM pages p
LEFT JOIN page_components pc ON pc.page_id = p.id AND pc.component_type = 'bio_card'
WHERE p.is_active = true
GROUP BY p.id, p.slug, p.title
HAVING COUNT(pc.id) = 0
ORDER BY p.display_order, p.slug;

-- Step 2: Add bio_card component to pages missing it
-- ============================================
-- For pages without bio_card, insert it after the hero component
DO $$
DECLARE
    page_record RECORD;
    hero_position int;
    new_position int;
BEGIN
    -- Loop through each active page missing bio_card
    FOR page_record IN 
        SELECT p.id as page_id, p.slug
        FROM pages p
        WHERE p.is_active = true
        AND NOT EXISTS (
            SELECT 1 FROM page_components pc2 
            WHERE pc2.page_id = p.id AND pc2.component_type = 'bio_card'
        )
    LOOP
        -- Find the hero component's position for this page
        SELECT COALESCE(MAX(pc.position), 0) INTO hero_position
        FROM page_components pc
        WHERE pc.page_id = page_record.page_id 
        AND pc.component_type = 'hero';
        
        -- If no hero found, set position to 1, otherwise hero_position + 1
        IF hero_position = 0 THEN
            new_position := 1;
        ELSE
            new_position := hero_position + 1;
        END IF;
        
        -- Shift all existing components at position >= new_position
        UPDATE page_components 
        SET position = position + 1
        WHERE page_id = page_record.page_id
        AND position >= new_position;
        
        -- Insert bio_card at the new position
        INSERT INTO page_components (page_id, component_type, config, position)
        VALUES (
            page_record.page_id,
            'bio_card',
            '{"author": "Dave Halmai", "authorImage": "/images/dave-profile.png", "readingTime": 5}',
            new_position
        );
        
        RAISE NOTICE 'Added bio_card to page: % at position %', page_record.slug, new_position;
    END LOOP;
END $$;

-- Step 3: Verify - show pages with their components including bio_card
-- ============================================
SELECT 
    p.slug,
    p.title,
    pc.component_type,
    pc.position,
    pc.config
FROM pages p
LEFT JOIN page_components pc ON pc.page_id = p.id
WHERE p.is_active = true
AND pc.component_type IN ('hero', 'bio_card')
ORDER BY p.display_order, p.slug, pc.position;
