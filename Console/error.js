const Divide = (x,y) => {
	if (y===0) {
		console.error('Divide by Zero Error');
	}

	else {
		console.log('Result: '+x/y);
	}
};

Divide(4,0);