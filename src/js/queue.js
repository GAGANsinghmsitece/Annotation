class Queue{

	constructor(){
		this.items=[]
	}

	enqueue(element){
		this.items.push(element);
	}

	dequeue(element){
		if(this.isEmpty()){
			console.log("Underflow");
		}
		return this.items.shift();
	}

	isEmpty(){
		if(this.items.length==0){
			return true;
		}else{
			return false;
		}
	}

	front(){
		return this.items[0];
	}
}

export default Queue;