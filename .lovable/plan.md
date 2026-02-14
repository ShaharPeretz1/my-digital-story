

# Add Profile Photo to Hero Section

## What will change
Your professional headshot will be placed inside the circular avatar on the home page, replacing the current "YN" initials placeholder.

## Technical details
1. Copy the uploaded photo to `src/assets/profile.png`
2. Update `src/pages/Index.tsx` to import the image and use `AvatarImage` to display it inside the existing Avatar component, keeping the "YN" fallback in case the image fails to load

