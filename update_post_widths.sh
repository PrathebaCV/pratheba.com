#!/bin/bash
# Script to update post container width to 80% on desktop for all en_pakkam posts

echo "Updating post container width to 80% on desktop..."

cd /home/pratheba/repository/pratheba.com/en_pakkam

# List of files to update (excluding already updated ones)
files_to_update=(
    "happy-wedding-day.html"
    "idhayathil-orupaadhi.html"
    "irakkamillaa_urakkam.html"
    "kaditham.html"
    "kanavugal.html"
    "kannagi.html"
    "kavithaigalmudivadhillai.html"
    "kaviyondru_elutha.html"
    "ki-raa-vin-vedhapuraththaarkku.html"
    "mayiladuthurai_express.html"
    "mazhai_kaalam_2.html"
    "mazhaikaala-maalai.html"
    "neerkkodu.html"
    "neeyum-naanum.html"
    "nilavae.html"
    "ninaivo-oru-paravai.html"
    "post-template.html"
    "rayil_payanam.html"
    "sivaratridiaries.html"
    "thayumanavar.html"
)

for file in "${files_to_update[@]}"; do
    if [ -f "$file" ]; then
        echo "Updating $file..."
        
        # Update max-width from 800px to 80%
        sed -i 's/max-width: 800px;/max-width: 80%;\n            width: 80%;/' "$file"
        
        # Update mobile media query
        sed -i '/margin: 2rem 1rem;/a\                max-width: 90%;\n                width: 90%;' "$file"
        
        echo "✅ Updated $file"
    else
        echo "❌ File $file not found"
    fi
done

echo "✅ All files updated!"
