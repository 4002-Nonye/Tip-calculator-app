'use strict';
let outPut2 = 0;
let total = 0;
const err2 = document.querySelector('.err2');
const tipBtn = document.querySelectorAll('.btn__percent');
const tipAmount = document.querySelector('.custom');
const amount = document.querySelector('.input__amount');
const tipValue = document.querySelector('.tip__value');
const peopleTotal = document.querySelector('.people__total-input');
const err = document.querySelector('.err');
const borderError = document.querySelector('.people__total');
const reset = document.querySelector('.reset');
const totalTip = document.querySelector('.total__tip');
const topErr = () => {
	err2.classList.add('hidden');
	err2.classList.remove('apply__shake');
};
const addTopErr = () => {
	err2.classList.remove('hidden');
	err2.classList.add('apply__shake');
};
const errRemove = () => {
	err.classList.add('hidden');
	borderError.classList.remove('hide');
	err.classList.remove('apply__shake');
	borderError.classList.remove('apply__shake');
};
const customCalc = () => {
	if (
		+tipAmount.value > 0 &&
		+tipAmount.value <= 100 &&
		amount.value.length < 7
	)
		outPut2 =
			((+tipAmount.value / 100) * amount.value) / +peopleTotal.value;
	tipValue.innerHTML = outPut2.toFixed(2);
	const total2 = +amount.value / +peopleTotal.value + +tipValue.innerHTML;
	totalTip.innerHTML = total2.toFixed(2);
};
const defaultSetting = () => {
	amount.value = '';
	peopleTotal.value = '';
	tipValue.innerHTML = '00.00';
	totalTip.innerHTML = '00.00';
	tipAmount.value = '';
	borderError.classList.add('apply__shake');
	err.classList.add('apply__shake');
	err.classList.remove('hidden');
	borderError.classList.add('hide');
	setTimeout(() => {
		errRemove();
	}, 3000);
};

const resetSetting = () => {
	defaultSetting();
	errRemove();
};

const calc = () => {
	if (peopleTotal.value === 0 || !peopleTotal.value) {
		defaultSetting();
	} else {
		if (amount.value.length <= 7)
			total = +amount.value / peopleTotal.value + +tipValue.innerHTML;
		totalTip.innerHTML = total.toFixed(2);
	}
	errRemove();
};
const calcTip = () => {
	tipBtn.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			if (!+amount.value || +peopleTotal.value === 0) {
				defaultSetting();
			} else {
				if (amount.value.length > 7 || amount.value === 0) {
					addTopErr();
				} else {
					errRemove();
					let innerBtn = e.target.innerHTML;
					const outPut =
						((+innerBtn.slice(0, -1) / 100) * amount.value) /
						+peopleTotal.value;
					tipValue.innerHTML = outPut.toFixed(2);
					topErr();

					calc();
				}
			}
		});
	});

	tipAmount.addEventListener('input', () => {
		if (+peopleTotal.value === 0) {
			defaultSetting();
			amount.focus();
		} else {
			if (amount.value.length < 7) {
				topErr();
				calc();
				customCalc();
			} else {
				addTopErr();
			}
		}
	});
};
calcTip();
const resetMe = () => {
	reset.addEventListener('click', () => {
		setTimeout(() => {
			resetSetting();
			topErr();
		}, 1000);
	});
};

resetMe();
