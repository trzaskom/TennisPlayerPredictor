import csv, numpy

array = []
filename = "rankings_0_2018-05-21.csv"
with open(filename, 'rb') as input_file:
    foo = csv.reader(input_file)
    for row in foo:
        array.append([str(row).split(',')[9], str(row).split(',')[8], str(row).split(',')[12], str(row).split(',')[13]])


with open("output_ranking.txt", 'w') as output_file:
    for elem in array:
        name = str(elem[2]).split('-')
        elem[3] = str(elem[3]).split(']')[0]
        print (elem[3] + '\n')
        output_file.write(elem[0] + " " + elem[1] + " " + name[0].title() + " " + name[1].title() + " " + elem[3] + '\n')