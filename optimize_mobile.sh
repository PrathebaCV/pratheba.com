#!/bin/bash

echo "Applying specific mobile layout updates for 95% coverage and 4pt fonts..."

# Function to add specific mobile CSS
add_mobile_optimizations() {
    local file="$1"
    echo "Optimizing mobile layout for $file..."
    
    # Add comprehensive mobile CSS at the end of the style section
    if grep -q "</style>" "$file"; then
        # Remove existing mobile media query if it exists
        sed -i '/@media (max-width: 768px)/,/}/d' "$file"
        
        # Insert new mobile CSS before closing </style>
        sed -i '/<\/style>/i \
\
        /* Mobile Optimizations for 95% coverage and 4pt fonts */ \
        @media (max-width: 768px) { \
            * { \
                font-size: 4pt !important; \
            } \
            \
            body { \
                padding: 0.125rem !important; \
                margin: 0 !important; \
                width: 100% !important; \
                max-width: 100% !important; \
            } \
            \
            .post-container, \
            .portfolio-container, \
            .review-content, \
            .container { \
                width: 95% !important; \
                max-width: 95% !important; \
                margin: 0.25rem auto !important; \
                padding: 0.25rem !important; \
            } \
            \
            .post-title, \
            .portfolio-title, \
            .content-title, \
            .review-title, \
            h1, h2, h3, h4, h5, h6 { \
                font-size: 4pt !important; \
                margin: 0.125rem 0 !important; \
            } \
            \
            .post-content, \
            .portfolio-subtitle, \
            .post-date, \
            .review-content p, \
            p, span, div { \
                font-size: 4pt !important; \
                line-height: 1.2 !important; \
                margin: 0.125rem 0 !important; \
            } \
            \
            .back-button { \
                width: 20px !important; \
                height: 20px !important; \
                top: 0.125rem !important; \
                left: 0.125rem !important; \
                font-size: 4pt !important; \
            } \
            \
            .story-grid, \
            .portals-container { \
                grid-template-columns: 1fr !important; \
                gap: 0.125rem !important; \
                padding: 0 !important; \
                width: 95% !important; \
                margin: 0 auto !important; \
            } \
            \
            .portal, \
            .story-card { \
                margin: 0.125rem !important; \
                padding: 0.25rem !important; \
                width: calc(100% - 0.25rem) !important; \
            } \
            \
            .hero-section { \
                padding: 0.125rem !important; \
            } \
            \
            .main-content-area, \
            .hero-layout { \
                width: 95% !important; \
                margin: 0 auto !important; \
                padding: 0.125rem !important; \
            } \
        }' "$file"
    fi
}

# Update all HTML files
for file in *.html en_pakkam/*.html book_reviews/*.html; do
    if [ -f "$file" ]; then
        add_mobile_optimizations "$file"
    fi
done

echo "Mobile optimizations completed - 95% coverage and 4pt fonts applied!"
