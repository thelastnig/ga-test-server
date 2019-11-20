args <- commandArgs(TRUE)
text <- args

Sys.setenv(LANGUAGE='en')
.libPaths("C:/Users/pjw/Documents/R/win-library/3.6")

library(tm)
library(wordcloud)
library(RColorBrewer)
library(SnowballC) 
library(dplyr)
library(stringr)

text <- str_replace_all(text, "\\W", " ")
text <- gsub("'", '', text)

docs <- Corpus(VectorSource(text))

docs <- tm_map(docs, content_transformer(tolower))
docs <- tm_map(docs, removeNumbers)
docs <- tm_map(docs, removePunctuation)
docs <- tm_map(docs, removeWords, stopwords("english"))
docs <- tm_map(docs, removeWords, c("own", "stop", "words"))
docs <- tm_map(docs, stripWhitespace)

toString <- content_transformer(function(x, from, to) gsub(from, to, x))

docs <- tm_map(docs, toString, "specific transform", "ST")
docs <- tm_map(docs, toString, "other specific transform", "OST")

dtm <- TermDocumentMatrix(docs)
m <- as.matrix(dtm)

v <- sort(rowSums(m),decreasing = TRUE) 
d <- data.frame(word = names(v),freq=v)

d <- d$word
d <- as.character(d)
cat(d)