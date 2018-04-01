# TEMPORARY HACK
#
# Problem: cannot find a way to share Enums.js between React 
#          and Cloud Functions
# Solution: only modify src/Enums.js, run this script to copy 
#           over to functions/Enums.js.
#
# This script copies src/Enums.js to functions/Enums.js and
# adds a warning comment at the top.

import shutil

def main():
    src = 'src/Enums.js'
    dst = 'functions/Enums.js'

    warning =  '// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n'
    warning += '// !!   AUTO GENERATED FROM src/Enums.js, DO NOT MODIFY   !!\n'
    warning += '// !!   Please modify src/Enums.js instead and run:       !!\n'
    warning += '// !!             `python hacks/cp_enums.py`              !!\n'
    warning += '// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n\n'

    shutil.copy(src, dst)
    with open(dst, 'r+') as f:
        lines = f.readlines()
        f.seek(0)
        f.write(warning)
        f.writelines(lines)

if __name__ == '__main__':
    main()