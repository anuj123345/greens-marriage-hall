# Graph Report - C:/Users/anujb/greens  (2026-04-14)

## Corpus Check
- Corpus is ~4,120 words - fits in a single context window. You may not need a graph.

## Summary
- 29 nodes · 27 edges · 6 communities detected
- Extraction: 81% EXTRACTED · 19% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.79)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Greens Website Pages|Greens Website Pages]]
- [[_COMMUNITY_Partner Brand Identities|Partner Brand Identities]]
- [[_COMMUNITY_Visual Design System|Visual Design System]]
- [[_COMMUNITY_Logo Assets|Logo Assets]]
- [[_COMMUNITY_Weavorah Brand|Weavorah Brand]]
- [[_COMMUNITY_Studio Sinfonia Brand|Studio Sinfonia Brand]]

## God Nodes (most connected - your core abstractions)
1. `Greens Marriage Hall` - 9 edges
2. `Logos Directory` - 4 edges
3. `Weavorah` - 4 edges
4. `Contact Page` - 3 edges
5. `Indulge The Salon` - 3 edges
6. `Studio Sinfonia` - 3 edges
7. `Home Page` - 2 edges
8. `Pricing Page` - 2 edges
9. `Studio Sinfonia (Combined)` - 2 edges
10. `Indulge The Salon (Combined)` - 2 edges

## Surprising Connections (you probably didn't know these)
- `Greens Marriage Hall` --conceptually_related_to--> `Logos Directory`  [INFERRED]
  SITE.md → logos/README.txt

## Hyperedges (group relationships)
- **Co-Presented Indian Lifestyle Brands** — logoscombined_studio_sinfonia, logoscombined_indulge_salon, logoscombined_weavorah [INFERRED 0.75]

## Communities

### Community 0 - "Greens Website Pages"
Cohesion: 0.28
Nodes (9): About Page, Contact Page, Features Page, Greens Marriage Hall, Home Page, Pricing Page, Tagline: Where Your Dream Wedding Comes to Life, Target Audience (Families and Couples) (+1 more)

### Community 1 - "Partner Brand Identities"
Cohesion: 0.4
Nodes (5): Weavorah, Saree & Textile Brand, Gold Amber Brand Color, Gold Loom / Weaving Grid Icon, Sarees. Stories. Soul.

### Community 2 - "Visual Design System"
Cohesion: 0.5
Nodes (4): Indulge Salon Logo, Logos Directory, Studio Sinfonia Logo, Weavorah Logo

### Community 3 - "Logo Assets"
Cohesion: 0.5
Nodes (4): Indulge The Salon, Hair & Beauty Salon, Soft Blue and Light Gray Palette, Minimalist Elegant Typography Logo

### Community 4 - "Weavorah Brand"
Cohesion: 0.5
Nodes (4): Studio Sinfonia, Music & Recording Studio, Circular Icon with Music Note and Headphones, Dark Background with Orange White Contrast Logo

### Community 5 - "Studio Sinfonia Brand"
Cohesion: 1.0
Nodes (3): Indulge The Salon (Combined), Studio Sinfonia (Combined), Weavorah (Combined)

## Knowledge Gaps
- **18 isolated node(s):** `Features Page`, `About Page`, `Target Audience (Families and Couples)`, `Visual Direction (Pastel Palette, Rounded Components)`, `Tagline: Where Your Dream Wedding Comes to Life` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Greens Marriage Hall` connect `Greens Website Pages` to `Visual Design System`?**
  _High betweenness centrality (0.152) - this node is a cross-community bridge._
- **Why does `Logos Directory` connect `Visual Design System` to `Greens Website Pages`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Contact Page` (e.g. with `Home Page` and `Pricing Page`) actually correct?**
  _`Contact Page` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Features Page`, `About Page`, `Target Audience (Families and Couples)` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._