const images = document.querySelectorAll('.slider-img');
const controlls = document.querySelectorAll('.controlls');
let imageIndex = 0;

 
export function show(index) {
    images[imageIndex].classList.remove('active');
    images[index].classList.add('active');
    imageIndex = index;
}

controlls.forEach((e) => {
    e.addEventListener('click', (event) => {
        if (event.target.classList.contains('prev')) {
            let index = imageIndex - 1;

            if (index < 0) {
                index = images.length - 1;
            }

            show(index);
        } else if (event.target.classList.contains('next')) {
            let index = imageIndex + 1;
            if (index >= images.length) {
                index = 0;
            }
            show(index);
        }
    })
})
export function autoSlide() {
    let index = imageIndex + 1;
    if (index >= images.length) {
        index = 0;
    }
    show(index);
} //Рома