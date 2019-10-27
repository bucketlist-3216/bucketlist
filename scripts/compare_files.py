import os

orig = '/Users/cksash/Downloads/data/monday_photos'
comp = '/Users/cksash/Downloads/data/output'

originals = [f for f in os.listdir(orig) if os.path.isfile(os.path.join(orig, f))]
compressed = [f for f in os.listdir(comp) if os.path.isfile(os.path.join(comp, f))]

print (originals[0 : 10])
print (compressed[0 : 10])

count = 0
# Compare the results
print ('Files missing from ' + comp)
for f in originals:
    if f not in compressed:
        count += 1
        print ('File missing ' + f)

print ('Missing: ' + str(count))

count = 0
# Compare the results
print ('Files missing from ' + orig)
for f in compressed:
    if f not in originals:
        count += 1
        print ('File missing ' + f)

print ('Missing: ' + str(count))