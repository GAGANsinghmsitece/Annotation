class Queue{
	constructor(){
		this.items=[];
	}
	push(element){
		this.items.push(element);
	}
	pop(){
		if(this.isEmpty()){
			return "Underflow";
		}
		return this.items.shift();
	}
	front(){
		if(this.isEmpty()){
			return "No elements in queue";
		}
		return this.items[0];
	}
	isEmpty(){
		return this.items.length==0;
	}
	print(){
		var str=""; 
		for(var i=0;i<this.items.length;i++) 
        str+=this.items[i]+" ";
        return str; 
	}
}
export default Queue;