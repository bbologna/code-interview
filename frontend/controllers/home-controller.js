
export default [
	'HomeController',
	 [function () {
		this.recordedModel = [];
		this.response = "Hello";
		this.reset = () => {
			this.recordedModel = [];
			this.text = "start typing";
		}
	}]
]
