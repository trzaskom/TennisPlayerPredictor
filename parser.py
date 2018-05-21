import csv, numpy

array = []
filename = "match_scores_2017-2017.csv"
with open(filename, 'rb') as input_file:
    foo = csv.reader(input_file)
    for row in foo:
        array.append([str(row).split(',')[7], str(row).split(',')[8], str(row).split(',')[9]])

seen = set()
result = []
for item in array:
    if item[0] not in seen:
        seen.add(item[0])
        result.append(item)


with open("output.txt", 'w') as output_file:
    for elem in result:
        output_file.write(elem[0] + " " + elem[1] + " " + elem[2] + '\n')