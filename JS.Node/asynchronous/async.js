/* 
비동기 vs 동기적 호출의 예
*/
const syncButton = document.createElement('button')
syncButton.textContent = 'Sync!'

const asyncButton = document.createElement('button')
asyncButton.textContent = 'Async!'

document.body.append(syncButton, asyncButton)

syncButton.onclick = handleClick;
asyncButton.onclick = handleClick;

const isSync = undefined;

function handleClick(event) {
    if (event.target.innerText === 'Sync!') {
        console.log('동기적 주문을 시작합니다')
        synchronous()
    } else {
        console.log('비동기적 주문을 시작합니다')
        asynchronous()
    }
}

function synchronous() {
    function waitSync(ms) {
        var start = Date.now();
        var now = start;
        while (now - start < ms) {
            now = Date.now();;
        }
    }
    //현재시각(now)과 시작시각(start)이 ms 범위 내에서 무한루프를 도는 blocking함수
    function drink(person, coffee) {
        console.log(`${person}는 ${coffee}를 마십니다`);
    }

    function orderCoffeeSync(coffee) {

        console.log(`${coffee} 주문이 접수되었습니다`)
        waitSync(2000);
        return coffee;
    }
    let customers = [{
        name: 'james',
        request: 'americano'
    }, {
        name: 'tony',
        request: 'cafe latte'
    }];

    //call synchronously
    customers.forEach(function (customer) {
        let coffee = orderCoffeeSync(customer.request)
        drink(customer.name, coffee);
    });
}


function asynchronous() {
    function waitAsync(callback, ms) {
        setTimeout(callback, ms)
    }
    function drink(person, coffee) {
        console.log(`${person}은 ${coffee}를 마십니다`)
    }

    let customers = [{
        name: 'james',
        request: 'americano'
    }, {
        name: 'tony',
        request: 'cafe latte'
    }];

    function orderCoffeeAsync(menu, callback) {
        console.log(`${menu}주문이 접수되었습니다`)
        waitAsync(function () {
            callback(menu)
        }, 2000)
    }

    //call asynchronously
    customers.forEach(function (customer) {
        orderCoffeeAsync(customer.request, function (coffee) {
            drink(customer.name, coffee);
        });
    });

}

