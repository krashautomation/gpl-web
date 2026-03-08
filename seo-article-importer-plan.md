# Project Notes – Article Importer + SEO System

## 1. Progress Made Today

- Built an **Article Importer system** using **OpenAI**.
- Used **Claude AI** to help architect the workflow.
- Current workflow:
  1. Copy an article manually (no URL parsing required).
  2. Send the text to OpenAI.
  3. OpenAI **rewrites/spins the article**.
  4. The system **returns structured output**.
  5. The app **auto-populates the fields in the new article entry**.

**Benefit**

- No need for web scraping.
- Fast content creation workflow.
- Articles are automatically formatted for the CMS.

---

## 2. Current Problems / Limitations

### Image Workflow Problem

The system requires **an image upload first**, which creates friction.

Issues:

- Need to **find a copyright-free image**
- Need to **edit/spin the image somehow**
- The image must be **uploaded before the article**

Possible improvement:

- Pre-load a **stock image library**
- Automatically:
  - Download
  - Resize
  - Rename
  - Attach to article

---

### Content Spinning / Detection Problem

The article rewriting needs improvement.

Current concern:

- Content may still be **AI detectable**

Tasks:

- Research **better prompt engineering**
- Improve **humanization of text**
- Add instructions for:
  - Tone variation
  - Sentence restructuring
  - Opinion injection
  - Paragraph reshaping

Goal:

- Produce **natural human-style content**

---

## 3. UI Improvements Needed

### Import Article Tool Instructions

Add a **popup guide** explaining how to use the feature.

Should include:

- How to copy/paste an article
- Image upload instructions
- What fields are auto-filled
- Editing recommendations

---

## 4. Next Major Feature: Automated Article Discovery

Future system:

Instead of manually copying articles:

1. Maintain a list of **industry news sources**
2. Crawl them for new articles
3. Extract article text
4. Send to OpenAI for rewriting
5. Automatically generate new posts

Example categories:

- Oil industry
- Energy
- Technology
- Construction
- Landscaping (relevant to your contractor tools)

This becomes a **content pipeline**.

---

## 5. Backlink Intelligence Feature (Future SEO Tool)

Goal:
Find **where top websites get backlinks**.

System idea:

1. Analyze competitor sites
2. Extract backlink sources
3. Store them in a database
4. Identify opportunities:
   - directories
   - guest posts
   - citations
   - forums
   - blogs

Long-term possibility:

- Automate backlink outreach or submissions.

Benefit:

- Increase **domain authority**
- Improve **Google rankings**

---

## 6. On-Page SEO Feature (Internal Linking)

Need a feature to automatically add **internal links** inside articles.

Example:

```
Learn more about pipeline safety here.
Read our analysis of oil market trends.
```

Functionality:

- Scan article text
- Detect keywords
- Insert links to:
  - other articles
  - category pages
  - guides

Benefits:

- Stronger **on-page SEO**
- Better **site structure**
- Increased **time on site**

---

## 7. Combined Vision

This evolves into a **full SEO content engine**:

### Content Engine

- Import article
- Rewrite
- Attach images
- Publish

### SEO Engine

- Internal linking
- Backlink discovery
- Keyword optimization

### Content Discovery

- Crawl industry sites
- Feed new topics automatically

---

## 8. Immediate Next Tasks (Priority)

### High Priority

1. Fix **image workflow**
2. Improve **article humanization prompts**
3. Add **tool instructions popup**

### Medium Priority

4. Build **internal linking feature**

### Later

5. Build **article crawler**
6. Research **backlink analysis system**

---

**What you're actually building (without realizing it yet):**

A **mini AI-powered SEO publishing engine**.
