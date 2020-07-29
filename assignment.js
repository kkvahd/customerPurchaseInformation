fetch('http://localhost:5000/api/data')
    .then(res => res.json())
    .then(json => {

        // Number of orders
        document.getElementById('orderNums').innerText = json.length;

        // Total amount of orders
        let totalAmount = 0
        for (let i = 0; i < json.length; i++) {
            totalAmount += Number(json[i]['Amount']);
        }
        document.getElementById('totalAmount').innerText = totalAmount;

        // Customers who ordered once and didn't order again
        let customerNames = [];
        let uniqueCustomers = [];
        for (let i = 0; i < json.length; i++) {
            let name = json[i]['Name'];

            if (customerNames.includes(name)) {
                uniqueCustomers = uniqueCustomers.filter(x => x != name);
            } else {
                customerNames.push(name);
                uniqueCustomers.push(name);
            }
        }
        // document.getElementById('singleOrderCustomers').innerText = uniqueCustomers;
        uniqueCustomers.map(x => {
            let node = document.createElement("LI");
            let textNode = document.createTextNode(x)
            node.appendChild(textNode)
            document.getElementById("singleOrderCustomers").appendChild(node);
        });

        // Count of customers
        let customerOrders = {};
        for (let i = 0; i < json.length; i++) {
            let name = json[i]['Name'];
            if (name in customerOrders) {
                customerOrders[name] += 1;
            } else {
                customerOrders[name] = 1
            }
        }

        let customerCategories = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0
        }

        for (let i = 0; i < Object.keys(customerOrders).length; i++) {
            let key = Object.keys(customerOrders)[i];
            switch (customerOrders[key]) {
                case 1:
                    customerCategories[1] += 1
                    break;
                case 2:
                    customerCategories[2] += 1
                    break;
                case 3:
                    customerCategories[3] += 1
                    break;
                case 4:
                    customerCategories[4] += 1
                    break;
                default:
                    customerCategories[5] += 1
            }
        }
        Object.keys(customerCategories).map(x => {
            let body = document.getElementById('customerTableBody');

            let tr = document.createElement("tr");

            let td1 = document.createElement("td");
            let td2 = document.createElement("td");

            let textNode1 = document.createTextNode(x);
            let textNode2 = document.createTextNode(customerCategories[x]);

            td1.appendChild(textNode1);
            td2.appendChild(textNode2);

            tr.appendChild(td1);
            tr.appendChild(td2);

            body.appendChild(tr);
        });

        // Bar graph
        var ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',

            data: {
                labels: ["1", "2", "3", "4", "5+"],
                datasets: [{
                    label: 'Number of Customers',

                    data: Object.values(customerCategories),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Number of order vs Number of customers'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                        }
                    }]
                },
            }
        });

    });
