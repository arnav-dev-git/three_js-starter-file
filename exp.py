
name = input("enter your name: ")
i = 0
length = len(name)
prev = ""
while(i < length):
    if(name[i] not in prev and name[i] is not " "):
        prev += name[i]
        strn = f'{name[i]}:{name.count(name[i])}'
        print(strn)

    i += 1
