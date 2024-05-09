import {TresObject3D} from "@tresjs/core";
import {filter} from "lodash";
import {onMounted, onUnmounted} from "vue";

/**
 * 处理并操作给定的节点对象数组。
 * @param nodes 一个包含多个TresObject3D对象的记录（键为字符串，值为TresObject3D对象）。
 * @param callback 当对象被添加时调用的回调函数，接收一个TresObject3D对象作为参数。
 * @param included 一个字符串数组，包含应被处理的对象名称。如果未提供或为空，则处理所有对象。
 */
export function NodeHandler(nodes: Record<string, TresObject3D>, callback: (object: TresObject3D) => void, included: string[] = []) {
    // 检查nodes参数是否为对象
    if (typeof nodes !== 'object' || nodes === null) {
        console.error('Invalid input: nodes must be an object.');
        return;
    }

    // 使用Set来优化名称查找性能
    const includedSet = new Set(included);

    /**
     * 检查节点是否包含在included数组中。
     * @param node 要检查的TresObject3D对象。
     * @returns {boolean} 如果节点名称在includedSet中，则返回true；否则返回false。
     */
    function isIncluded(node: TresObject3D): boolean {
        return includedSet.has(node.name);
    }

    // 防御性编程：确保即使nodes为空对象，也能正确处理
    const nodeValues = Object.values(nodes || {});
    // 筛选出符合条件的节点对象
    const matchingObjects = filter(nodeValues, isIncluded);

    // 在组件挂载时，为符合条件的对象添加事件监听器
    try {
        onMounted(() => {
            matchingObjects.forEach((object: TresObject3D) => {
                try {
                    object.addEventListener('added', () => {
                        callback(object);
                    });
                } catch (error) {
                    console.error(`Error adding event listener to object: ${error}`);
                }
            });
        });
    } catch (error) {
        console.error(`An error occurred in NodeHandler: ${error}`);
    }
    // 在组件卸载时，移除之前添加的事件监听器
    try {
        onUnmounted(()=>{
            matchingObjects.forEach((object:TresObject3D)=>{
                try {
                    object.removeEventListener('added',()=>{
                        callback(object);
                    });
                }catch (error){
                    console.error(`Error removing event listener to object: ${error}`);
                }
            });
        });
    }catch (error) {
        console.error(`An error occurred in NodeHandler: ${error}`);
    }
}
