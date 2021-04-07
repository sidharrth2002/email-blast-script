# extra script to remove redundant emails

uniqueEmails = []

with open('mailinglist.csv', 'r') as input:
    for email in input:
        if email not in uniqueEmails:
            uniqueEmails.append(email)

with open('mailinglist.csv', 'w') as output:
    for email in uniqueEmails:
        output.write(email)