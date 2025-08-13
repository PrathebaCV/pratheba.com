#!/usr/bin/env python3
"""
Script to add floating menu to all HTML files in the website.
This script will add the necessary script tag and Font Awesome CSS to HTML files
that don't already have them.
"""

import os
import re
from pathlib import Path

def get_relative_path(file_path, root_dir):
    """Get the relative path for floating-menu.js based on file location."""
    rel_path = os.path.relpath(root_dir, os.path.dirname(file_path))
    if rel_path == ".":
        return "floating-menu.js"
    else:
        return os.path.join(rel_path, "floating-menu.js").replace("\\", "/")

def update_html_file(file_path, root_dir):
    """Update a single HTML file to include floating menu."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if Font Awesome is already included
        has_fontawesome = 'font-awesome' in content.lower()
        
        # Check if floating-menu.js is already included
        has_floating_menu = 'floating-menu.js' in content
        
        # Get the relative path to floating-menu.js
        relative_js_path = get_relative_path(file_path, root_dir)
        
        # Create the script tag
        script_tag = f'    <script src="{relative_js_path}"></script>'
        
        # Create Font Awesome link if needed
        fontawesome_link = '    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">'
        
        # Find where to insert (after the last link/meta tag before the first style tag)
        # Pattern to find the insertion point
        pattern = r'(<title[^>]*>.*?</title>)'
        
        if re.search(pattern, content, re.IGNORECASE | re.DOTALL):
            # Insert after title tag
            def replacement(match):
                result = match.group(1)
                if not has_fontawesome:
                    result += '\n' + fontawesome_link
                if not has_floating_menu:
                    result += '\n' + script_tag
                return result
            
            new_content = re.sub(pattern, replacement, content, flags=re.IGNORECASE | re.DOTALL)
            
            # Only write if content changed
            if new_content != content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"✓ Updated: {file_path}")
                return True
            else:
                print(f"⚬ No changes needed: {file_path}")
                return False
        else:
            print(f"✗ Could not find insertion point in: {file_path}")
            return False
            
    except Exception as e:
        print(f"✗ Error processing {file_path}: {e}")
        return False

def main():
    """Main function to process all HTML files."""
    root_dir = "/home/pratheba/repository/pratheba.com"
    os.chdir(root_dir)
    
    # Find all HTML files
    html_files = []
    for root, dirs, files in os.walk("."):
        # Skip node_modules and other common directories
        dirs[:] = [d for d in dirs if d not in ['.git', 'node_modules', '__pycache__']]
        
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))
    
    print(f"Found {len(html_files)} HTML files to process...")
    print()
    
    updated_count = 0
    
    # Process each file
    for file_path in sorted(html_files):
        if update_html_file(file_path, root_dir):
            updated_count += 1
    
    print()
    print(f"Processing complete! Updated {updated_count} files out of {len(html_files)} total.")

if __name__ == "__main__":
    main()
