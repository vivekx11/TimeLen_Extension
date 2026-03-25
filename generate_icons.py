"""
this code is to create a logo in any px

Generate TimeLens extension icons
Run: python generate_icons.py
Requires: pip install pillow
"""

try:
    from PIL import Image, ImageDraw
except ImportError:
    print("Please install Pillow: pip install pillow")
    exit(1)

def create_icon(size):
    # Create image with transparent background
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Colors
    bg_color = (108, 99, 255, 255)  # Purple
    fg_color = (255, 255, 255, 255)  # White
    
    # Draw circle background
    padding = size // 8
    draw.ellipse([padding, padding, size - padding, size - padding], 
                 fill=bg_color)
    
    # Draw clock hands
    center = size // 2
    radius = size // 3
    
    # Hour hand (pointing to 12)
    hand_width = max(2, size // 20)
    draw.line([center, center, center, center - radius // 2], 
              fill=fg_color, width=hand_width)
    
    # Minute hand (pointing to 3)
    draw.line([center, center, center + radius * 0.7, center], 
              fill=fg_color, width=hand_width)
    
    # Center dot
    dot_size = max(3, size // 15)
    draw.ellipse([center - dot_size, center - dot_size, 
                  center + dot_size, center + dot_size], 
                 fill=fg_color)
    
    return img

# Generate icons
sizes = [16, 48, 128]
for size in sizes:
    icon = create_icon(size)
    icon.save(f'icons/icon{size}.png')
    print(f'Generated icon{size}.png')

print('\nIcons generated successfully!')
print('If you don\'t have Pillow installed, you can:')
print('1. Run: pip install pillow')
print('2. Or create icons manually using any image editor')
