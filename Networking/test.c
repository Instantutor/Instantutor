#include <stdio.h>
#include "Server.h"
#include <string.h>
#include <netinet/in.h>
#include <unistd.h>

void launch (struct Server * server )
{
    while (1)
    {
        char buffer[30000];
        printf("====== Waiting for Connection =====");
        int address_length = sizeof(server->address);
        int new_socket = accept( server->socket, (struct sockaddr *)&server->address,(socklen_t*)&address_length);
        read(new_socket,buffer,30000);
        printf("%s\n",buffer);
        char *hello = "<h1> Homo Deus</h1>"; 
        write(new_socket, hello, strlen(hello));
        close(new_socket);
    }

}

int main()
{
    printf("1\n");
    struct Server server = server_constructor(AF_INET,SOCK_STREAM, 0, INADDR_ANY, 80, 10,launch);
    server.launch(&server);
    printf("2\n");
}