const input = document.getElementById("task")
const liste = document.querySelector("ul")

function newElement() {
    var inputValue = input.value.trim();
    if (inputValue !== "") {
        let item = {
            text: inputValue,
            status: false // Başlangıçta tamamlanmamış olarak ayarlayalım
        };

        addListitem(item);

        let items = JSON.parse(localStorage.getItem('items')) || [];
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));

        input.value = "";
        $("#liveToast").toast('show');
    } else {
        task.value = "";
        $("#liveToastt").toast('show');
    }
}

function addListitem(item) {
    let li = document.createElement('li');
    li.textContent = item.text;

    if (item.status) {
        li.classList.add('checked');
    }

    li.addEventListener('click', function () {
        this.classList.toggle("checked");
        item.status = !item.status;
        updateLocalStorage(item)
    });

    let deleteBut = createDeleteButton(item);
    li.appendChild(deleteBut);

    liste.appendChild(li)
}

function createDeleteButton(item) {
    let  deleteBut = document.createElement("button");
    deleteBut.textContent = "X";
    deleteBut.style.position = "absolute";
    deleteBut.style.display =  "flex"
    deleteBut.style.border = "transparent";
    deleteBut.style.fontSize = "22px"
    deleteBut.style.width = "5%"
    deleteBut.style.textAlign= "center"
    deleteBut.style.justifyContent = "center"
    deleteBut.style.height = "99%"
    deleteBut.style.marginTop = "-39px"
    deleteBut.style.paddingTop = "8px";
    deleteBut.style.left = "95%"
    deleteBut.style.backgroundColor = "transparent";

    deleteBut.addEventListener("click", function(){
        this.parentElement.remove();
        $("#liveToastDelete").toast('show');

        // LocalStorage'dan öğeyi sil
        let items = JSON.parse(localStorage.getItem('items')) || [];
        const valueToRemove = item;
        const indexToRemove = items.indexOf(valueToRemove);
        if (indexToRemove !== -1) {
            items.splice(indexToRemove, 1);
            localStorage.setItem('items', JSON.stringify(items));
        }
    });


    deleteBut.addEventListener("mouseover", function(event) {
        event.target.style.backgroundColor = "#f78501";
    });
    deleteBut.addEventListener("mouseout", function(event) {
        event.target.style.backgroundColor = "transparent";
    });

    return deleteBut;
}

function updateLocalStorage(item) {
    let items = JSON.parse(localStorage.getItem('items')) || [];
    const indexToUpdate = items.findIndex(i => i.text === item.text);
    if (indexToUpdate !== -1) {
        items[indexToUpdate].status = item.status;
        localStorage.setItem('items', JSON.stringify(items));
    }
}

window.onload = function(){
    let items = JSON.parse(localStorage.getItem('items')) || [];
    items.forEach(function (item) {
        addListitem(item);
    });
}

document.addEventListener("keydown", function(event) {
    if(event.key === "Enter"){
        newElement();
        task.value = ""
    }
})
