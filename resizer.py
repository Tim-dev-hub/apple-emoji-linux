from PIL import Image
import os, sys

dir_path = "./png/128"
print('check')

def resize_im(path):
    if os.path.isfile(path):
        im = Image.open(path).resize((64,64), Image.ANTIALIAS)
        parent_dir = os.path.dirname(path)
        img_name = os.path.basename(path).split('.')[0]
        im.save(os.path.join(parent_dir, img_name + '.png'), 'PNG', quality=100)

def resize_all(mydir):
    print('f')
    for subdir , _ , fileList in os.walk(mydir):
        print(fileList)
        for f in fileList:
            try:
                full_path = os.path.join(subdir,f)
                resize_im(full_path)
            except Exception as e:
                print('Unable to resize %s. Skipping.' % full_path)

if __name__ == '__main__':
    resize_all(dir_path)
