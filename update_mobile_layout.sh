#!/bin/bash

echo "Starting mobile layout updates..."

# Function to update CSS in files
update_mobile_css() {
    local file="$1"
    echo "Updating $file..."
    
    # Update body font-size and padding for mobile
    sed -i 's/font-size: 4pt;/font-size: 4pt;/g' "$file"
    
    # Update container widths to 95% for mobile
    sed -i 's/max-width: 80%/max-width: 95%/g' "$file"
    sed -i 's/width: 80%/width: 95%/g' "$file"
    
    # Update padding and margins for mobile
    sed -i 's/padding: 2rem/padding: 0.25rem/g' "$file"
    sed -i 's/margin: 4rem auto/margin: 0.5rem auto/g' "$file"
    sed -i 's/margin: 2rem 1rem/margin: 0.125rem/g' "$file"
    sed -i 's/padding: 1.5rem/padding: 0.5rem/g' "$file"
    
    # Update font sizes to 4pt for mobile
    sed -i 's/font-size: 2.5rem/font-size: 1rem/g' "$file"
    sed -i 's/font-size: 1.5rem/font-size: 4pt/g' "$file"
    sed -i 's/font-size: 1.25rem/font-size: 4pt/g' "$file"
    sed -i 's/font-size: 1.2rem/font-size: 4pt/g' "$file"
    sed -i 's/font-size: 1.1rem/font-size: 4pt/g' "$file"
    sed -i 's/font-size: 1rem/font-size: 4pt/g' "$file"
    sed -i 's/font-size: 0.9rem/font-size: 4pt/g' "$file"
    
    # Add mobile media query if not exists
    if ! grep -q "@media (max-width: 768px)" "$file"; then
        cat >> "$file" << 'EOF'

        @media (max-width: 768px) {
            body {
                padding: 0.125rem;
                font-size: 4pt;
            }
            
            .post-container, .portfolio-container, .review-content {
                width: 95%;
                max-width: 95%;
                margin: 0.25rem auto;
                padding: 0.25rem;
            }
            
            .post-title, .portfolio-title, .content-title {
                font-size: 4pt;
            }
            
            .post-content, .portfolio-subtitle, .post-date {
                font-size: 4pt;
            }
            
            .back-button {
                width: 25px;
                height: 25px;
                top: 0.25rem;
                left: 0.25rem;
            }
        }
EOF
    fi
}

# Update all en_pakkam HTML files
for file in en_pakkam/*.html; do
    if [ -f "$file" ]; then
        update_mobile_css "$file"
    fi
done

# Update all book review HTML files
for file in book_reviews/*.html; do
    if [ -f "$file" ]; then
        update_mobile_css "$file"
    fi
done

# Update portfolio.html and about-me.html
for file in portfolio.html about-me.html; do
    if [ -f "$file" ]; then
        update_mobile_css "$file"
    fi
done

echo "Mobile layout updates completed!"
