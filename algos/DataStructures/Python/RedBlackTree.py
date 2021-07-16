from os import X_OK
from collections import deque
import sys

class Red_Black_Node: 
    def __init__(self):
        self.color = 0
        self.val = sys.maxsize
        self.parent = None
        self.left = None
        self.right = None


class Red_Black_Tree:

    def __init__(self):
        self.root = None
    
    def insert (self, inserted_node: Red_Black_Node) -> None:
        curr,parent = self.root , None
        while curr:
            parent = curr
            if inserted_node.val < curr.val: curr = curr.left
            else: curr = curr.right
        inserted_node.parent = parent
        if parent == None: self.root = inserted_node
        elif inserted_node.val < parent.val: parent.left = inserted_node
        else: parent.right = inserted_node
        inserted_node.left, inserted_node.right, inserted_node.color = None, None, 1
        if not inserted_node.parent: return 
        if not inserted_node.parent.parent: return
        self.balance(inserted_node)
    

    def rotate_left(self,target_node: Red_Black_Node) -> None:
        right = target_node.right
        target_node.right= right.left
        if right.left: right.left.parent = target_node
        right.parent = target_node.parent
        if target_node.parent: self.root = right
        elif target_node.parent and target_node == target_node.parent.left: target_node.parent.left = right
        else: target_node.parent.right = right
        right.left = target_node
        target_node.parent = right


    def rotate_right(self,x: Red_Black_Node) -> None:
        y = x.left
        x.left = y.right
        if not y.right: y.right.parent = x
        y.parent = x.parent
        if not x.parent: self.root = y
        elif x.parent and x == x.parent.right: x.parent.right = y
        else: x.parent.left = y
        y.right = x
        x.parent = y
        

    def balance(self, target_node: Red_Black_Node) -> None:
        while target_node.parent.color == 1:
            if target_node.parent == target_node.parent.parent.left:
                ptr = target_node.parent.parent.right
                if ptr and ptr.color == 1:
                    target_node.parent.color = 0
                    ptr.color = 0
                    target_node.parent.parent.color = 1
                    target_node = target_node.parent.parent
                elif target_node == target_node.parent.parent:
                    target_node = target_node.parent
                    self.rotate_left(target_node)
                target_node.parent.color = 0
                target_node.parent.parent.color = 1
                self.rotate_right(target_node.parent.parent) 
            else:
                ptr = target_node.parent.parent.left
                if ptr and ptr.color == 1:
                    target_node.parent.color = 0
                    ptr.color = 0
                    target_node.parent.parent.color = 1
                    target_node = target_node.parent.parent
                elif target_node == target_node.parent.parent:
                    target_node = target_node.parent
                    self.rotate_right(target_node)
                target_node.parent.color = 0
                target_node.parent.parent.color = 1
                self.rotate_left(target_node.parent.parent) 
            if target_node == self.root: break
        self.root.color = 0

    def printall(self):
        deq,vals = deque([[self.root]]),[[self.root.val,self.root.color]]
        while deq:
            temp = deq.popleft()
            holder,holder2 = [],[]
            for i in temp:
                if i.left:
                    holder.append(i.left)
                    holder2.append((i.left.val,i.left.color))
                if i.right:
                    holder.append(i.right)
                    holder2.append((i.right.val,i.right.color))
            if holder:
                deq.append(holder)
                vals.append(holder2)
        print(vals)


obj = Red_Black_Tree()
for i in range(8):
    node = Red_Black_Node()
    node.val = i
    obj.insert(node)
obj.printall()
