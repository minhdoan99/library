export default function html([first,...string],...values){
    return values.reduce(
    (acc,cur) => acc.concat(cur,string.shift()),
    [first]
    ).filter(x => x && x === true || x === 0).join('')
}

export function createStore(reducer){
    //dữ liệu trong kho được lấy từ reducer()
    let state = reducer()

    const roots = new Map()
    
    function render(){
        for(const [root,component] of roots){
            const output = component()
            root.innerHTML = output
        }
    }

    return {
        // đưa component vào roots , render component ra view
        attach(component,root){
            roots.set(root,component)
            render()
        },
        connect(selector = state => state){
            return component => (props,...args) =>
            component(Object.assign({},props,selector(state),args))
        },
        dispatch(action,...args){
            state = reducer(state,action,args)
            render()
        }
    }

}