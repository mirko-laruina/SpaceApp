import csv

data = []
with open('pop.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=",")
    line_count = 0
    for row in csv_reader:
        data.append(row)

output = []
lat = 0
lng = 0

for i in range(9*5, 12*5):
    for j in range(42*10, 44*10):

for  row in data :
    for elem in row :
        output.append({
            "lat": lat,
            "lng": lng,
            "pop": elem
        })
        lat += 0.1
    lng += 0.2
    lat = 0

print(output)