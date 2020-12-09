const url = 'https://localhost:5001/api/User';
const uri = 'https://localhost:5001/api/Register';
const urls = 'https://localhost:5001/api/Personal';
const url1 = 'https://localhost:5001/api/PostPersonal';

function Register() {
    const userName = document.getElementById('UserName').value;
    const passWord = document.getElementById('PassWord').value;
    const cpassWord = document.getElementById('CpassWord').value;
    const item = {
        UserName: userName.trim(),
        PassWord: passWord.trim(),
        CpassWord: cpassWord.trim()
    };
    if (userName == "") {
        alert("用户名不能为空");
        return;
    }
    if (passWord == "") {
        alert("密码不能为空");
        return;
    }
    if (cpassWord != passWord) {
        alert("二次密码不一致，请重新输入");
        return;
    }

    fetch(uri, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })

        .then(response => {
            response.json();
            alert("注册成功");
            window.location.href = 'index.html';
        })
        .catch(error => console.error('Unable to add item.', error))
        .then(response => console.log('Success', response));
}

function login() {
    const userName = document.getElementById('UserName').value;
    const passWord = document.getElementById('PassWord').value;

    const item = {

        UserName: userName.trim(),
        PassWord: passWord.trim()
    };
    if (userName == "") {
        alert("用户名不能为空");
        return;
    }
    if (passWord == "") {
        alert("密码不能为空");
        return;
    }
    fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })

        .then(response => {
            response.json();
            alert("登录成功！");
            window.location.href = 'personal.html' + '?id=1';


        })
        .catch(error => console.error('Unable to add item.', error))
        .then(response => console.log('Success', response));
}


function GetPersonal(id) {

    fetch(urls + '?id=1', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then((res) => {
            return res.json()
        })
        .then((datas) => {
            console.log(datas);
            document.getElementById('Id').value = datas.id;
            document.getElementById('UserName').value = datas.userName;
            document.getElementById('PassWord').value = datas.passWord;
            document.getElementById('Provinces').value = datas.provinces;
            var cit = document.getElementById('City').value
            cit = datas.city;
            document.getElementById('Url').value = datas.url;
            document.getElementById('img').src = datas.fileUrl;
            if (datas.gender == "男") {
                document.getElementById('Gender1').checked = true;
            }
            if (datas.gender == "女") {
                document.getElementById('Gender2').checked = true;
            }
            document.getElementById('Age').value = datas.age;

            var data = [{
                Provinces: "广东省",
                cities: ["深圳市", "东莞市", "潮汕市", "中山市", "广州市"]
            },
            {
                Provinces: "贵州省",
                cities: ["都匀市", "遵义市", "独山市", "瓮安市", "贵阳市"]
            },
            {
                Provinces: "辽宁省",
                cities: ["沈阳市", "大连市", "铁岭市", "丹东市", "锦州市"]
            }]

            var sf = document.querySelector("#Provinces");
            var cityBox = document.querySelector("#City");
            var cityHid = document.querySelector("#hidCity").value;
            var imgBox = document.getElementById('Image');
            var img = document.getElementById('img');
            // addEventListener向元素添加事件
            imgBox.addEventListener("change", function () {
                //FileReader可以获取文件中的数据
                var reader = new FileReader();
                //获取文件内容以url形式表示
                reader.readAsDataURL(imgBox.files[0]);

                reader.onload = function () {
                    //赋值给img
                    img.src = this.result
                }
            })
            if (sf.value == "广东省" || sf.value == "贵州省" || sf.value == "辽宁省") {
                var cityData;
                if (sf.value == "广东省") {
                    cityData = data[0].cities;
                }
                if (sf.value == "贵州省") {
                    cityData = data[1].cities;
                }
                if (sf.value == "辽宁省") {
                    cityData = data[2].cities;
                }
                for (var i = 0; i < cityData.length; i++) {
                    var city = cityData[i];
                    var opt = document.createElement("option");
                    opt.value = city;
                    opt.text = city;
                    if (city == cit) {
                        opt.setAttribute("selected", true);
                    }
                    cityBox.appendChild(opt);
                }
            }



            sf.onchange = function () {
                cityBox.innerHTML = "";
                var Citydata;
                if (sf.value == "广东省") {
                    Citydata = data[0].cities;
                }
                if (sf.value == "贵州省") {
                    Citydata = data[1].cities;
                }
                if (sf.value == "辽宁省") {
                    Citydata = data[2].cities;
                }
                for (var j = 0; j < Citydata.length; j++) {
                    var citys = Citydata[j];
                    var opt = document.createElement("option");
                    opt.value = citys;
                    opt.text = citys;

                    cityBox.appendChild(opt);
                }
            }
        })
    //    document.getElementById('Gender').value=item.UserName;
    //    document.getElementById('Age').value=item.UserName;
    //    document.getElementById('Provinces').value=item.UserName;
    //    document.getElementById('City').value=item.UserName;
    //    document.getElementById('img').value=item.UserName;
    //    document.getElementById('Url').value=item.UserName;
}


function Personal() {
    var imgBox = document.getElementById('Image').value;
    var imgBoxs = document.getElementById('Image');
    
    

    var img = document.getElementById('img');
    const id = document.getElementById('Id').value;
    const userName = document.getElementById('UserName');
    const passWord = document.getElementById('PassWord');
    const age = document.getElementById('Age');
    const provinves = document.getElementById('Provinces');
    const city = document.getElementById('City');
    const url = document.getElementById('Url');

    var radios = document.getElementsByName("loan");
    var reader = new FileReader();
    if (imgBox != "") {
        reader.readAsDataURL(imgBoxs.files[0]);
            reader.onload = function () {
                img.src = this.result
        }
    }
    
    var value = 0;
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked == true) {
            value = radios[i].value;
        }
    }
    if (age.value < 2 || age.value > 120 || isNaN(age.value) == true) {
        alert("输入年龄格式不正确！请重新输入");
        return;
    }
    var reg = /^((http|https):\/\/)?(([A-Za-z0-9]+-[A-Za-z0-9]+|[A-Za-z0-9]+)\.)+([A-Za-z]+)[/\?\:]?.*$/;
    if (!reg.test(url.value)) {
        alert("网址不正确哦,请重新输入");
        return;
    }
    if(imgBox==""){
        img.src="";
    }
    const item = {
        Id: parseInt(id, 10),
        UserName: userName.value.trim(),
        PassWord: passWord.value.trim(),
        Gender: value,
        Age: age.value.trim(),
        Provinces: provinves.value.trim(),
        City: city.value.trim(),
        Url: url.value.trim(),
        Image: img.src
    };
    fetch(url1 + "?id=" + id, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item),
    })
    

        .then(response => {
            response.json();
            alert("修改成功！");
        })

        .then((datas) => {
            console.log(datas);
        })
        .catch(error => console.error('Unable to add item.', error))
        .then(response => console.log('Success', response))

}


