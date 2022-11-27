//get files or download files here in this directory

////////// for uploading file to server //////////
pscp -l arturojj testtransfer.txt 192.168.1.10:/home/arturojj
//////////////////////////////////////////////////

////////// for downloading file from server /////
pscp -l arturojj 192.168.1.10:/home/arturojj/testtransfer.txt testtransfer2.txt
//////////////////////////////////////////////////

////////// for uploading file to public remote server using tunnel(ngrok) //////////
pscp -l arturojj -P portnumber testtransfer.txt arturojj.tcp.ap.ngrok.io:/home/arturojj
//////////////////////////////////////////////////

////////// for downloading file from public remote server using tunnel(ngrok) /////
pscp -l arturojj -P portnumber arturojj.tcp.ap.ngrok.io:/home/arturojj/testtransfer.txt testtransfer2.txt
//////////////////////////////////////////////////