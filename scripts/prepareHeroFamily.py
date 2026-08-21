from pathlib import Path
from PIL import Image

source = Path('/home/ubuntu/webdev-static-assets/khangvuong-hero-airport-family.webp')
output = Path('/home/ubuntu/webdev-static-assets/khangvuong-hero-airport-family-optimized.webp')

image = Image.open(source).convert('RGB')
target_size = (1920, 720)
if image.size != target_size:
    image = image.resize(target_size, Image.Resampling.LANCZOS)
image.save(output, 'WEBP', quality=82, method=6)
print(output)
