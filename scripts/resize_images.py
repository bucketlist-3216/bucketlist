import os
import subprocess
from shutil import copyfile

# Ensure that jpegoptim and optipng command line utilities are installed on your device.

source = os.path.join('/Users/cksash/Downloads/data', 'monday_photos')
dest = os.path.join('/Users/cksash/Downloads/data', 'output')
ip_files = os.listdir(source)

# Create output directory
# os.makedirs(dest)

# Find all formats
formats = set()

# Separate formats
others = []

ip_files = [f for f in ip_files if 'DS_Store' not in f]
jpegs = [f for f in ip_files if f.split('.')[-1].lower().strip() in ['jpg', 'jpeg']]
pngs = [f for f in ip_files if f.split('.')[-1].lower().strip() in ['png']]
others = [f for f in ip_files if f.split('.')[-1].lower() not in ['jpg', 'jpeg', 'png']]
print (others)

# Compress jpegs
for f in jpegs:
    subprocess.run(['jpegoptim', os.path.join(source, f), '-d', dest, '-m', '50'])

# Compress pngs
for f in pngs:
    subprocess.run(['optipng', os.path.join(source, f), '-dir', dest])

for f in others:
    print ('File to copy is: ' + f)
    print ('Copy from: ' + os.path.join(source, f))
    print ('Copy to: ' + os.path.join(dest, f))
    copyfile(os.path.join(source, f), os.path.join(dest, f))

print ('Done processing')