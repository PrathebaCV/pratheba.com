#!/bin/bash

echo "Starting font size increase by 4 points across all files..."

# Function to update font sizes in files
increase_font_sizes() {
    local file="$1"
    echo "Updating font sizes in $file..."
    
    # Increase base font sizes by 4 points
    sed -i 's/font-size: 4pt/font-size: 8pt/g' "$file"
    sed -i 's/font-size: 8pt/font-size: 12pt/g' "$file"
    sed -i 's/font-size: 12pt/font-size: 16pt/g' "$file"
    sed -i 's/font-size: 16pt/font-size: 20pt/g' "$file"
    
    # Update clamp font sizes
    sed -i 's/clamp(4pt,/clamp(8pt,/g' "$file"
    sed -i 's/clamp(8pt,/clamp(12pt,/g' "$file"
    
    # Update rem-based font sizes
    sed -i 's/font-size: 0.9rem/font-size: 1.2rem/g' "$file"
    sed -i 's/font-size: 1.1rem/font-size: 1.4rem/g' "$file"
    sed -i 's/font-size: 1.2rem/font-size: 1.5rem/g' "$file"
    sed -i 's/font-size: 1.5rem/font-size: 1.8rem/g' "$file"
    sed -i 's/font-size: 2rem/font-size: 2.3rem/g' "$file"
    sed -i 's/font-size: 2.5rem/font-size: 2.8rem/g' "$file"
    sed -i 's/font-size: 3rem/font-size: 3.3rem/g' "$file"
    
    # Update mobile optimization comments
    sed -i 's/4pt fonts/8pt fonts/g' "$file"
    sed -i 's/8pt fonts/12pt fonts/g' "$file"
}

# Update all HTML files
for file in *.html en_pakkam/*.html book_reviews/*.html; do
    if [ -f "$file" ]; then
        increase_font_sizes "$file"
    fi
done

echo "Font size increase completed!"
