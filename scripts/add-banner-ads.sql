-- ============================================
-- Add Banner Ads to Pages Missing Them
-- Run this SQL in your Supabase SQL Editor
-- ============================================

-- Step 1: Find pages without banner ads
-- ============================================
SELECT 
    p.id,
    p.slug,
    p.title,
    COUNT(pc.id) as existing_components
FROM pages p
LEFT JOIN page_components pc ON pc.page_id = p.id AND pc.component_type = 'ads'
WHERE p.is_active = true
GROUP BY p.id, p.slug, p.title
HAVING COUNT(pc.id) = 0
ORDER BY p.display_order, p.slug;

-- Step 2: Add banner ad component to pages missing it
-- ============================================
-- For pages without ads, insert banner ad at position 0
-- and shift existing components by 1 to make room
DO $$
DECLARE
    page_record RECORD;
BEGIN
    -- Loop through each active page
    FOR page_record IN 
        SELECT p.id as page_id, p.slug
        FROM pages p
        WHERE p.is_active = true
        AND NOT EXISTS (
            SELECT 1 FROM page_components pc 
            WHERE pc.page_id = p.id AND pc.component_type = 'ads'
        )
    LOOP
        -- Shift all existing components by +1
        UPDATE page_components 
        SET position = position + 1
        WHERE page_id = page_record.page_id;
        
        -- Insert banner ad at position 0
        INSERT INTO page_components (page_id, component_type, config, position)
        VALUES (
            page_record.page_id,
            'ads',
            '{"affiliateName": "Money Metals Exchange", "adName": "Money Metals Exchange", "href": "https://www.awin1.com/cread.php?s=3928246&v=88985&q=519082&r=2775708", "src": "https://www.awin1.com/cshow.php?s=3928246&v=88985&q=519082&r=2775708"}',
            0
        );
        
        RAISE NOTICE 'Added banner ad to page: %', page_record.slug;
    END LOOP;
END $$;

-- Step 3: Verify - show pages with their components
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
ORDER BY p.display_order, p.slug, pc.position;
