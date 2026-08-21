from pathlib import Path
from PIL import Image

source = Path('/home/ubuntu/webdev-static-assets/khangvuongbooking-logo-original.png')
output = Path('/home/ubuntu/webdev-static-assets/khangvuongbooking-logo.webp')

image = Image.open(source).convert('RGBA')
pixels = image.load()
for y in range(image.height):
    for x in range(image.width):
        red, green, blue, alpha = pixels[x, y]
        if red > 245 and green > 245 and blue > 245:
            pixels[x, y] = (red, green, blue, 0)

bounds = image.getbbox()
if bounds:
    image = image.crop(bounds)

target_width = 560
target_height = round(image.height * target_width / image.width)
image = image.resize((target_width, target_height), Image.Resampling.LANCZOS)
image.save(output, 'WEBP', quality=92, method=6)
print(output)
