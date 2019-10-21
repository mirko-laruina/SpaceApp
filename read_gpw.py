import csv

ncols     =    8640
nrows     =    4320
data = []
with open('raw_pop_all.asc') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=" ")
    for row in csv_reader:
        data.append(row)
        
output = []
"""
for i in range(int(42*8640/360), int(44*8640/360)):
    newRow = []
    for j in range(int(9*4320/360), int(12*4320/360)):
"""
for i in range(1, 8640):
    newRow = []
    lng = i*360/8640
    lng = lng-180

    for j in range(1, 4320):
        pop = int(float(data[4320-j][i]))
        
        if pop == -9999:
            pop = 0

        lat = j*360/8640 - 90

        if(lat>=42 and lat<=45 and lng>=9 and lng<=12):
            output.append({
                "lat": lat,
                "lng": lng,
                "pop": pop
            })

print(output)