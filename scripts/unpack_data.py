import os
import csv
import shutil
import uuid

path = 'singapore'

# Get list of locations
locations = [os.path.join(path, o) for o in os.listdir(path) if os.path.isdir(os.path.join(path, o))]

data = [['place_name', 'image_name']]
dest = 'images_unpacked_random/'
places = [['place_name']]
print (dest)

counter = 1

# Walk through the directories and copy out the files
for l in locations:
	place_name = l.split('/')[-1]
	places.append(place_name)

	for f in [fname for fname in os.listdir(l)]:
		if '.DS_Store' == f:
			continue

		fmt = f.split('.')[-1]
		name = uuid.uuid1()
		print (str(name))
		print ('Copying from ' + os.path.join(l, f))
		print ('Copying to ' + dest + str(name) + '.' + fmt)
		
		data.append([place_name, dest + str(name) + '.' + fmt])
		shutil.copy(os.path.join(l, f), dest + str(name) + '.' + fmt)
		counter += 1

# Convert to csv
with open('place_image_uuid.csv', "w", newline='') as f:
	writer = csv.writer(f)
	writer.writerows(data)
