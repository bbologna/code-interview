
export default [
	'HomeController',
	 [function () {
		this.recordedModel = [];
		this.response = "Hello dfa";
		this.reset = () => {
			this.recordedModel = [];
			this.text = "start typing";
		}
	}]
]
