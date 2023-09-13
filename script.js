(function(){
    const spanEl = document.querySelector("main h2 span");

    const textArr =['이것은 테스트 출력 메시지 입니다.','내일도 해는 뜬다', 'Hello Webpage!','모두들 반갑습니다','Java_StudyGroup'];
    
    let index = 0;
    let currentTxt = textArr[index].split("");
    
    function writeTxt(){
        spanEl.textContent += currentTxt.shift();
        if(currentTxt.length != 0){
            setTimeout(writeTxt,Math.floor(Math.random()*200)); //시간마다 함수 실행해주는 함수 
        }
        else{
            currentTxt = spanEl.textContent.split("");
            setTimeout(deleteTxt,3000);
        }
    }
    
    function deleteTxt(){
        currentTxt.pop();
        spanEl.textContent = currentTxt.join("");
        if(currentTxt.length != 0){
            setTimeout(deleteTxt, Math.floor(Math.random() * 100));
        }
        else{
            index++;
            if(index == 5){
                index = 0;
            }
            currentTxt = textArr[index].split("");
            writeTxt();
        }
        
    }
    
    writeTxt();
    
}) ();


(function (){
    
const headerEl = document.querySelector("header");

window.addEventListener("scroll",function(){
    scrollCheck();
});

function scrollCheck(){

    const browserScrollY = window.scrollY; 
    if(browserScrollY > 0){
        headerEl.classList.add('active');
    }
    else{
        headerEl.classList.remove('active');
    }

        console.log('scroll');
  
}

}) ();



const animationMove = function(selector){
    const target = document.querySelector(selector);
    const browserScrollY = window.scrollY;
    const targetScrollY = target.getBoundingClientRect().top + browserScrollY;
    window.scrollTo({top: targetScrollY,behavior:'smooth'});

    console.log(target);
}


const scrollMoveEl = document.querySelectorAll("[data-animation-scroll='true']");
console.log(scrollMoveEl);

for(let i = 0; i < scrollMoveEl.length; i++){
    scrollMoveEl[i].addEventListener("click",function(e){
        
        animationMove(this.dataset.target);
    });
}
