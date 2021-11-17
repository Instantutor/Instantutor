#ifndef LinkedList_h
#define Node_h

#include "Node.h"
#include <stdlib.h>

struct LinkedList_int
{
    struct Node_int *head;
    int length;

     void (*insert) (int index, int data, struct LinkedList_int *linked_list);

     void (*remove) (int index, struct LinkedList_int *linked_list);

     int (*retrieve) (int index, struct LinkedList_int *linked_list);

     struct LinkedList_int (*constructor)(void);

};

// struct Node_int * iterate (int index, struct *LinkedList_int linked_list);

struct LinkedList_int linked_list_int_constructor();
#endif 