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
for j in range(9*5, 12*5):
    for i in range(42*10, 44*10):
        print(j, i, data[i][j])
        output.append({
            "lat": j/10,
            "lng": i/5,
            "pop": data[i][j]
        })

print(output)