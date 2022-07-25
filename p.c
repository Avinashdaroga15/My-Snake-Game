#include <stdio.h>


int main()
{
  int a[30];
  int size,i,pos,num;
  printf("enter the size of array :");
  scanf("%d",&size);
  printf("enter the number of elements");
  
  for(i=0;i<size;i++){
    scanf("%d",&a[i]);
  }

  printf("enter the inserting location");
  scanf("%d",&pos);
  printf("enter the value :");
  scanf("%d",&num);
  
  for(i=size;i>=pos-1;i--){
    a[i+1]=a[i];
    
  }
  a[i+1]=num;
  
  for(i=0;i<=size;i++){
    printf("%d\n",a[i]);
  }
  return 0;
}