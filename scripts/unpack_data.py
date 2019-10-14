import os
import csv
import shutil

path = 'singapore'

# Get list of locations
locations = [os.path.join(path, o) for o in os.listdir(path) if os.path.isdir(os.path.join(path, o))]

data = [['place_name', 'image_name']]
dest = 'images_unpacked/'
print (dest)

counter = 1

# Walk through the directories and copy out the files
for l in locations:
	place_name = l.split('/')[-1]

	for f in [fname for fname in os.listdir(l)]:
		if '.DS_Store' == f:
			continue

		fmt = f.split('.')[-1]
		print ('Copying from ' + os.path.join(l, f))
		print ('Copying to ' + dest + str(counter) + '.' + fmt)
		
		data.append([place_name, dest + str(counter) + '.' + fmt])
		shutil.copy(os.path.join(l, f), dest + str(counter) + '.' + fmt)
		counter += 1

# Convert to csv
with open('place_image.csv', "w", newline='') as f:
	writer = csv.writer(f)
	writer.writerows(data)
