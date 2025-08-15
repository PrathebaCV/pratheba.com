#!/bin/bash

echo "Starting white theme update across all files..."

# Function to update theme colors in files
update_theme_colors() {
    local file="$1"
    echo "Updating theme in $file..."
    
    # Update background colors
    sed -i 's/background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)/background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)/g' "$file"
    sed -i 's/background: #111827/background: #ffffff/g' "$file"
    sed -i 's/background: var(--bg-primary)/background: #ffffff/g' "$file"
    sed -i 's/color: #ffffff/color: #000000/g' "$file"
    sed -i 's/color: rgba(255, 255, 255, 0.9)/color: rgba(0, 0, 0, 0.9)/g' "$file"
    sed -i 's/color: rgba(255, 255, 255, 0.8)/color: rgba(0, 0, 0, 0.8)/g' "$file"
    sed -i 's/color: rgba(255, 255, 255, 0.7)/color: rgba(102, 102, 102, 0.9)/g' "$file"
    sed -i 's/color: rgba(255, 255, 255, 0.6)/color: rgba(102, 102, 102, 0.8)/g' "$file"
    
    # Update heading colors to dark orchid
    sed -i 's/color: #d4af37/color: #9932cc/g' "$file"
    sed -i 's/background: linear-gradient(135deg, #d4af37, #f7dc6f)/background: linear-gradient(135deg, #9932cc, #8b008b)/g' "$file"
    sed -i 's/background: linear-gradient(135deg, #ffffff, #ff6b35)/background: linear-gradient(135deg, #9932cc, #8b008b)/g' "$file"
    
    # Update borders and shadows
    sed -i 's/border: 1px solid rgba(255, 255, 255, 0.1)/border: 1px solid #cccccc/g' "$file"
    sed -i 's/border: 1px solid rgba(255, 255, 255, 0.2)/border: 1px solid #cccccc/g' "$file"
    sed -i 's/border: 3px solid #d4af37/border: 3px solid #9932cc/g' "$file"
    sed -i 's/box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3)/box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1)/g' "$file"
    sed -i 's/box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3)/box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1)/g' "$file"
    
    # Update background cards
    sed -i 's/background: rgba(255, 255, 255, 0.05)/background: rgba(255, 255, 255, 0.9)/g' "$file"
    sed -i 's/background: rgba(255, 255, 255, 0.1)/background: rgba(153, 50, 204, 0.1)/g' "$file"
    sed -i 's/background: rgba(31, 41, 55, 0.7)/background: rgba(255, 255, 255, 0.9)/g' "$file"
    
    # Update particle color
    sed -i 's/background: #ff6b35/background: #9932cc/g' "$file"
    sed -i 's/background: var(--accent-color)/background: #9932cc/g' "$file"
}

# Update all HTML files
for file in *.html en_pakkam/*.html book_reviews/*.html; do
    if [ -f "$file" ]; then
        update_theme_colors "$file"
    fi
done

echo "White theme update completed!"
