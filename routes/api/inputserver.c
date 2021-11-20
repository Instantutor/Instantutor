// Created By Paritosh Kaushik 
#include "Server.h"
#include <stdlib.h>
#include <stdio.h>

struct Server server_constructor(int domain, int service, int protocol, u_long interface, int port, int backlog, void(*launch)(struct Server *server)) 
{
    struct Server server;

    server.domain = domain;
    server.service = service;
    server.protocol = protocol;
    server.interface = interface;
    server.port = port;
    server.backlog =  backlog;
    
    server.address.sin_family = domain;
    server.address.sin_port = htons(port);
    server.address.sin_addr.s_addr =  htonl(interface);

    server.socket = socket(domain, service, protocol);
    
   // Confirm the connection was successful.
    if (server.socket == 0)
    {
        perror("Failed to connect socket...\n");
        exit(1);
    }

    // Attempt to bind the socket to the network.
    if ((bind(server.socket, (struct sockaddr *)&server.address, sizeof(server.address))) < 0)
    {
        perror("Failed to bind socket...\n");
        exit(1);
    }

    // Start listening on the network.
    if ((listen(server.socket, server.backlog)) < 0)
    {
        perror("Failed to start listening...\n");
        exit(1);
    }

    server.launch = launch; 

    return server;
}

