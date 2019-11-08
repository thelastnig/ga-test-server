
Sys.setenv(LANGUAGE='en')

.libPaths("C:/Users/pjw/Documents/R/win-library/3.6")


attach(input[[1]])
data <- df
data <- paste(data, "additional", collapse = "")