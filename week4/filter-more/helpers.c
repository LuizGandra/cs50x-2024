#include "helpers.h"
#include <math.h>
#include <stdio.h>

// Convert image to grayscale
void grayscale(int height, int width, RGBTRIPLE image[height][width])
{
    for (int row = 0; row < height; row++)
		{
        for (int col = 0; col < width; col++)
				{
            int avg = (int) round((float) (image[row][col].rgbtBlue + image[row][col].rgbtGreen + image[row][col].rgbtRed) / 3);

            image[row][col].rgbtBlue = avg;
            image[row][col].rgbtGreen = avg;
            image[row][col].rgbtRed = avg;
        }
    }

    return;
}

// Reflect image horizontally
void reflect(int height, int width, RGBTRIPLE image[height][width])
{
    int limit = (width % 2 == 0) ? width / 2 : (width - 1) / 2;

    for (int row = 0; row < height; row++)
		{
        for (int col = 0; col < limit ; col++)
				{
            RGBTRIPLE temp = image[row][width - col - 1];
            image[row][width - col - 1] = image[row][col];
            image[row][col] = temp;
        }
    }

    return;
}

// Blur image
void blur(int height, int width, RGBTRIPLE image[height][width])
{
    RGBTRIPLE img_copy[height][width];

    // copy the image
    for (int row = 0; row < height; row++)
		{
        for (int col = 0; col < width; col++)
            img_copy[row][col] = image[row][col];
    }

    for (int row = 0; row < height; row++)
		{
        for (int col = 0; col < width; col++)
				{

            int red = 0, green = 0, blue = 0;
            int count = 0;

            for (int i = row - 1; i <= row + 1; i++)
						{
                if ((i >= 0 && i < height))
								{
                    for (int j = col - 1; j <= col + 1; j++)
										{
                        if ((j >= 0 && j < width))
												{
                            blue += img_copy[i][j].rgbtBlue;
                            green += img_copy[i][j].rgbtGreen;
                            red += img_copy[i][j].rgbtRed;

                            count++;
                        }
                    }
                }
            }

            int avg_blue = (int) round((float) blue / count);
            int avg_green = (int) round((float) green / count);
            int avg_red = (int) round((float) red / count);

            image[row][col].rgbtBlue = avg_blue;
            image[row][col].rgbtGreen = avg_green;
            image[row][col].rgbtRed = avg_red;
        }
    }

    return;
}

// Detect edges
void edges(int height, int width, RGBTRIPLE image[height][width])
{
    RGBTRIPLE img_copy[height][width];

    // copy the image
    for (int row = 0; row < height; row++)
		{
        for (int col = 0; col < width; col++)
            img_copy[row][col] = image[row][col];
    }

    for (int row = 0; row < height; row++)
		{
        for (int col = 0; col < width; col++)
				{

            int red_gx = 0, green_gx = 0, blue_gx = 0;
            int red_gy = 0, green_gy = 0, blue_gy = 0;
            int gx_grid[3][3] = {{-1, 0, 1}, {-2, 0, 2}, {-1, 0, 1}};
            int gy_grid[3][3] = {{-1, -2, -1}, {0, 0, 0}, {1, 2, 1}};
            int k = 0, l = 0;

            for (int i = row - 1; i <= row + 1; i++)
						{
                l = 0;

                if ((i >= 0 && i < height))
								{
                    for (int j = col - 1; j <= col + 1; j++)
										{
                        if ((j >= 0 && j < width))
												{
                            blue_gx += gx_grid[k][l] * img_copy[i][j].rgbtBlue;
                            green_gx += gx_grid[k][l] * img_copy[i][j].rgbtGreen;
                            red_gx += gx_grid[k][l] * img_copy[i][j].rgbtRed;

                            blue_gy += gy_grid[k][l] * img_copy[i][j].rgbtBlue;
                            green_gy += gy_grid[k][l] * img_copy[i][j].rgbtGreen;
                            red_gy += gy_grid[k][l] * img_copy[i][j].rgbtRed;
                        }

                        l++;
                    }
                }

                k++;
            }

            int blue = round(sqrt(pow(blue_gx, 2) + pow(blue_gy, 2)));
            int green = round(sqrt(pow(green_gx, 2) + pow(green_gy, 2)));
            int red = round(sqrt(pow(red_gx, 2) + pow(red_gy, 2)));

            if (blue > 255)
                blue = 255;
            if (green > 255)
                green = 255;
            if (red > 255)
                red = 255;

            image[row][col].rgbtBlue = blue;
            image[row][col].rgbtGreen = green;
            image[row][col].rgbtRed = red;
        }
    }

    return;
}