document.addEventListener('DOMContentLoaded', ()=> {

	// Блок с видео. Переход из эллипса в прямогульный формат блока
	if (document.documentElement.clientWidth > 992) { 
		$("section.full__plan .section__wrapper").each(function (index) {
		let triggerElement = $(this);
		let targetElement = $(".sticky__img");
		
		let tl = gsap.timeline({
			scrollTrigger: {
			trigger: triggerElement,
			// trigger element - viewport
			start: "top top",
			end: "bottom bottom",
			scrub: 1
			}
		});
		tl.fromTo(
			targetElement,
			{
			width: "74vw",
			height: "46vw",
			borderRadius: "46vw",
			ease: "none", ease: "none", duration: .5
			},
			{
			width: "100vw",
			height: "100vh",
			borderRadius: "0vw",
			ease: "none", ease: "none", duration: .5
			}
		)
		
		})
	}
	
	// SMOOTH ANCHOR SCROLL
	const $page = $('html, body');
	$('a[href*="#"]').click(function() {
		$page.animate({
			scrollTop: $($.attr(this, 'href')).offset().top
		}, 800);
		return false;
	});

	// PHONE MASK

	function maskPhone(selector, masked = '+7 (___) ___-__-__') {
		const elems = document.querySelectorAll(selector);

		function mask(event) {
			const keyCode = event.keyCode;
			const template = masked,
				def = template.replace(/\D/g, ""),
				val = this.value.replace(/\D/g, "");
			console.log(template);
			let i = 0,
				newValue = template.replace(/[_\d]/g, function (a) {
					return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
				});
			i = newValue.indexOf("_");
			if (i !== -1) {
				newValue = newValue.slice(0, i);
			}
			let reg = template.substr(0, this.value.length).replace(/_+/g,
				function (a) {
					return "\\d{1," + a.length + "}";
				}).replace(/[+()]/g, "\\$&");
			reg = new RegExp("^" + reg + "$");
			if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
				this.value = newValue;
			}
			if (event.type === "blur" && this.value.length < 5) {
				this.value = "";
			}

		}

		for (const elem of elems) {
			elem.addEventListener("input", mask);
			elem.addEventListener("focus", mask);
			elem.addEventListener("blur", mask);
		}
		
	}

	maskPhone('input[type="tel"]')

	// DETAIL PLANS

	function showHideModal(btn, close, overlay, modal, allBtn) {
		document.querySelectorAll(allBtn).forEach(btn => {
			btn.addEventListener('click', e => {
				e.preventDefault()
				document.querySelector('html').style.overflowY = 'hidden'
				document.querySelector(modal).style.display = 'flex'
				setTimeout(() => {
					document.querySelector(modal).classList.add('active')
				}, 0)
			})
		})
	
		document.querySelectorAll(btn).forEach(btn => {
			btn.addEventListener('click', e => {
				e.preventDefault()
				document.querySelector('html').style.overflowY = 'hidden'
				document.querySelector(modal).style.display = 'flex'
				setTimeout(() => {
					document.querySelector(modal).classList.add('active')
				}, 0)
			})
		})
	
		document.querySelector(close).addEventListener('click', e => {
			e.preventDefault()
			document.querySelector('html').style.overflowY = 'visible'
			document.querySelector(modal).classList.remove('active')
			setTimeout(() => {
				document.querySelector(modal).style.display = 'none'
			}, 500)
		})
	
		document.querySelector(overlay).addEventListener('click', e => {
			e.preventDefault()
			document.querySelector('html').style.overflowY = 'visible'
			document.querySelector(modal).classList.remove('active')
			setTimeout(() => {
				document.querySelector(modal).style.display = 'none'
			}, 500)
		})
	}

	showHideModal('.plan__btn', '.detail__plan .close', '.detail__plan .modal__overlay', '.detail__plan', '.plus')
	showHideModal('.video__btn', '.modal__video .close', '.modal__video .modal__overlay', '.modal__video')
	showHideModal('.btn', '.modal__form .close', '.modal__form .modal__overlay', '.modal__form')
	showHideModal('.news__item', '.detail__post .close', '.detail__post .modal__overlay', '.detail__post')

	// MENU

	document.querySelector('.menu').addEventListener('click', e => {
		e.preventDefault()
		if (!document.querySelector('header').classList.contains('active')) {
			document.querySelector('html').style.overflowY = 'hidden'
			document.querySelector('header').classList.add('active')
			document.querySelector('.modal__menu').classList.add('active')
		} else {
			document.querySelector('html').style.overflowY = 'visible'
			document.querySelector('header').classList.remove('active')
			document.querySelector('.modal__menu').classList.remove('active')
		}
	})

	// SWIPER

	// partners
	var partners = new Swiper(".partners__slider.swiper", {
		slidesPerView: 4,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		},
		loop: true,
	});

	// news
	var news = new Swiper(".news__wrapper.swiper", {
		slidesPerView: 3,
		navigation: {
			nextEl: ".news__arrow.next",
			prevEl: ".news__arrow.prev",
		},
		spaceBetween: 20
	});

	// benefits
	var benefitsImg = new Swiper(".benefits__img.swiper", {
		slidesPerView: 1,
		navigation: {
			nextEl: ".arrow.next",
			prevEl: ".arrow.prev",
		},
	});

	var benefitsInfo = new Swiper(".benefits__items.swiper", {
		slidesPerView: 1,
	});

	const swipeAllSliders = (index) => {
		benefitsImg.slideTo(index);
		benefitsInfo.slideTo(index);
	  }
	  
	benefitsImg.on('slideChange', () => swipeAllSliders(benefitsImg.activeIndex));
	benefitsInfo.on('slideChange', () => swipeAllSliders(benefitsInfo.activeIndex));

	// news
	var news = new Swiper(".plans__container.swiper", {
		slidesPerView: 3,
		loop: true,
	});

	// steps
	var stepsImg = new Swiper(".steps__img.swiper", {
		slidesPerView: 1,
	});

	var stepsInfo = new Swiper(".steps__slider.swiper", {
		slidesPerView: 1,
		navigation: {
			nextEl: ".steps__arrow.next",
			prevEl: ".steps__arrow.prev",
		},
	});

	const stepsAllSliders = (index) => {
		stepsImg.slideTo(index);
		stepsInfo.slideTo(index);
	  }
	  
	stepsImg.on('slideChange', () => stepsAllSliders(stepsImg.activeIndex));
	stepsInfo.on('slideChange', () => stepsAllSliders(stepsInfo.activeIndex));
})