#!/bin/bash

# Script to verify AnswerSnippet usage across pages

echo "🔍 Checking AnswerSnippet usage across the codebase..."
echo ""

# Define required patterns
REQUIRED_PAGES=(
  "app/blog/\\[slug\\]/page.tsx"
  "src/components/ComparisonPage.tsx"
)

# Check for AnswerSnippet import and usage
MISSING_COUNT=0

for PAGE in "${REQUIRED_PAGES[@]}"; do
  FILE=$(echo $PAGE | sed 's/\\\\/\//g')

  if [ -f "$FILE" ]; then
    # Check for import
    if grep -q "import.*AnswerSnippet" "$FILE"; then
      # Check for usage
      if grep -q "<AnswerSnippet" "$FILE"; then
        echo "✅ $FILE - Has AnswerSnippet"
      else
        echo "⚠️  $FILE - Imported but not used"
        MISSING_COUNT=$((MISSING_COUNT + 1))
      fi
    else
      echo "❌ $FILE - Missing AnswerSnippet"
      MISSING_COUNT=$((MISSING_COUNT + 1))
    fi
  else
    echo "⚠️  $FILE - File not found"
  fi
done

echo ""
echo "📊 Summary:"

# Count total usage
TOTAL_USAGE=$(grep -r "<AnswerSnippet" app/ src/ --include="*.tsx" --include="*.jsx" 2>/dev/null | wc -l)
echo "   Total AnswerSnippet usage: $TOTAL_USAGE instances"

# Check for duplicate H1s
echo ""
echo "🔍 Checking for duplicate H1 tags..."
DUPLICATE_H1=$(grep -r "<h1" app/ src/ --include="*.tsx" --include="*.jsx" 2>/dev/null | \
  awk -F: '{print $1}' | uniq -c | awk '$1 > 1 {print $2}')

if [ -z "$DUPLICATE_H1" ]; then
  echo "✅ No duplicate H1 tags found"
else
  echo "⚠️  Files with multiple H1 tags:"
  echo "$DUPLICATE_H1" | sed 's/^/   /'
fi

# Check for empty descriptions
echo ""
echo "🔍 Checking for empty metadata descriptions..."
EMPTY_DESC=$(grep -r "description: ''" app/ src/ --include="*.tsx" --include="*.ts" 2>/dev/null | wc -l)
if [ $EMPTY_DESC -eq 0 ]; then
  echo "✅ No empty descriptions found"
else
  echo "⚠️  Found $EMPTY_DESC empty descriptions"
fi

echo ""
if [ $MISSING_COUNT -eq 0 ]; then
  echo "✅ All required pages have AnswerSnippet components!"
  exit 0
else
  echo "❌ $MISSING_COUNT pages missing AnswerSnippet components"
  exit 1
fi