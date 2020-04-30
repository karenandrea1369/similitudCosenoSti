window.addEventListener('load', function(){

    var ranges = document.querySelectorAll('.range');
    var data = '';
    var resultContainer = document.querySelector('.resultContainer');
    var select = document.querySelector('.compare');
    var selectTo = document.querySelector('.compareTo');
    var btn = document.querySelector('.similarity');
    var btnUpload = document.querySelector('.upload');
    var result = document.querySelector('.resultContainer__data');
    var years = 1;
    var weight = 1;
    var height = 1;
    var pets = 1;
    var x,y;
    var radius;
    var angle;
    var finalResult;
    var arrayContainer = [];
    var arrayPrueba = [];
    var o1, o2, o3, o4;
    var t1, t2, t3, t4;
    var values = [];
    // var bigDecimal = require("bigdecimal");


    ranges.forEach((elem)=>{
        elem.addEventListener('input',handleRanges);
    });

    $('#submit-file').on("click",function(e){
        e.preventDefault();
        $('#files').parse({
            config: {
                delimiter: "auto",
                complete: displayHTMLSelect,
            },
            before: function(file, inputElem)
            {
                //console.log("Parsing file...", file);
            },
            error: function(err, file)
            {
                //console.log("ERROR:", err, file);
            },
            complete: function()
            {
                //console.log("Done with all files");
                createLines();
            }
            
        });

    });

    function displayHTMLSelect(results) {
        data = results.data;
        console.log(data);
        data.shift();
    }

    function createLines(){
        for (i = 0; i < data.length; i++) {
            // var text = document.createElement('p');
            // text.innerText = data[i];
            // resultContainer.appendChild(text);
            // console.log(data[i]);
            
            var rows = data[i].toString().split(',');
            console.log(data.length);
            selectOption = document.createElement('option');
            selectOption.classList.add('optionValue');
            selectOption.innerText = rows[0];
            selectOption.value = rows[0];
            select.appendChild(selectOption);
        } 
    }

    select.addEventListener('change',(event)=>{
        resultContainer.innerHTML='';
        for (i = 0; i < data.length; i++) {

            var rows = data[i].toString().split(',');

            var containerPerson = document.createElement('div');
            containerPerson.classList.add('containerPerson');
            containerPerson.style.backgroundImage = 'url(./fotos/' + (i + 1) + '.png)';
            var person = document.createElement('p');
            person.innerText = rows[0];
            containerPerson.appendChild(person);
            resultContainer.appendChild(containerPerson);
            

            if(rows[0] == event.target.value){
                containerPerson.classList.remove('containerPerson');
                containerPerson.classList.add('containerPerson--center');
            } else{
                arrayPrueba.push(data[i]);
                arrayContainer.push(containerPerson);
                // console.log(containerPerson);
            }            
        }
        console.log(arrayContainer);
    });

    btn.addEventListener('click',handleRanges);

    function handleCenterPerson(ev){
        var valueOne = select.value;
        for (i = 0; i < data.length; i++) {
            var numbers = data[i].toString().split(',');
            if(numbers[0] == valueOne){
                o1 = numbers[1];
                o2 = numbers[2];
                o3 = numbers[3];
                o4 = numbers[4];
            }
        }
    }

    

    function handleRanges(event){
        // var valueOne = select.value;
        // var valueTwo = selectTo.value;
        
        if(event.target.id == 'edad'){
            years = event.target.value
        }
        if(event.target.id == 'peso'){
            weight = event.target.value
        }
        if(event.target.id == 'altura'){
            height = event.target.value
        }
        if(event.target.id == 'mascotas'){
            pets = event.target.value
        }

        handleCenterPerson();

        var a1 = (years*((o1-19)/(23)));
        var a2 = (weight*((o2-45)/(80)));
        var a3 = (height*((o3-156)/(195)));
        var a4 = (pets*((o4-0)/(16)));

        for (i = 0; i < arrayPrueba.length; i++) {
            // console.log(arrayPrueba[i]);
            var numbers = arrayPrueba[i].toString().split(',');
            // console.log(numbers);
                t1 = numbers[1];
                t2 = numbers[2];
                t3 = numbers[3];
                t4 = numbers[4];
               
                var b1 = (years*((t1-19)/23));
                var b2 = (weight*((t2-45)/(80)));
                var b3 = (height*((t3-156)/(195)));
                var b4 = (pets*((t4-0)/(16)));

                // console.log(b1,b2,b3,b4);
                // console.log(b1+b2+b3+b4);
        
                var pointProduct = ((a1*b1) +  (a2*b2) +  (a3*b3) +  (a4*b4));
                // console.log(pointProduct);
        
                var magOne = Math.sqrt((a1**2) + (a2**2) + (a3**2) + (a4**2));
                // console.log(magOne);
        
                var magTwo = Math.sqrt((b1**2) + (b2**2) + (b3**2) + (b4**2));
                // console.log(magTwo);

                finalResult = (pointProduct/(magOne*magTwo));
                var d = bigDecimal.multiply(finalResult.toString(),"10000000000");
                // console.log(d);
                // console.log(numbers[0]+finalResult);
                values[i] = finalResult;
                // ((2*Math.PI)/(arrayContainer.length))*(i+1)
                // radius = 50+((135*(1-finalResult)) + ((1-finalResult) * 115));

                // var logaritmo = Math.pow(-10,7)*Mat.log(5/Math.pow(-10,7))
                
        }   
        
        var min = Math.min(...values);
        console.log('MIN:'+min)
        var max = Math.max(...values);
        console.log('MAX:'+max)

        for (let i = 0; i < values.length; i++) {
            // start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1))
            var map = (0.0001 + (1 - 0.0001)) * ((values[i] - min)/(max - min));
            
            var vvalue = new bigDecimal(values[i]+"");
            var vstart1 = new bigDecimal(""+min);
            var vstop1 = new bigDecimal(""+max);
            var vstart2 = new bigDecimal('0.0');
            var vstop2 = new bigDecimal('1.0');
            
            var restaA = vvalue.subtract(vstart1);
            var restaB = vstop1.subtract(vstart1);
            var divisionA = restaA.divide(restaB);
            var divisionB = new bigDecimal (bigDecimal.divide(restaA.getValue()+"",restaB.getValue()+"",25));
            var restaC = vstop2.subtract(vstart2);
            var sumaA = vstart2.add(restaC);
            var newMap = sumaA.multiply(divisionB);
            console.log(newMap);
            
            var decimal = bigDecimal.multiply(map.toString(),"10000000");
            // var res = (values[i]-min) / (max-min); 
            // console.log(decimal);
            // var b1 = (years*((t1-19)/(23-19)));
            radius = 90+((1-newMap.getValue())*200);
            angle = ((2*Math.PI)/(arrayContainer.length))*(i+1);
                x = radius * Math.cos(angle);
                y = radius * Math.sin(angle);
                
                // console.log('Y en la posición'+ i + ':' + y);
                arrayContainer[i].style.top = y + 255 + 'px';
                arrayContainer[i].style.left = x + 255 + 'px';
        }
    }

});