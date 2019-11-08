RemoveTags <- function(Words) {
  sub("/[A-Z]{2,3}","",Words)
}